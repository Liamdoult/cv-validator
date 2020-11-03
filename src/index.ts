import YAML from "yaml";

interface Generic {
  [key: string]: any;
}

function isNumber(v: any) {
  return typeof v === "number" || v instanceof Number;
}

function isString(v: any) {
  return typeof v === "string" || v instanceof String;
}

function isBoolean(v: any) {
  return typeof v === "boolean" || v instanceof Boolean;
}

function isValidType(
  obj: Generic,
  fields: Array<string>,
  ops: Array<(v: any) => boolean>
) {
  fields.forEach((field) => {
    ops.forEach((op) => {
      if (obj[field])
        if (!op(obj[field]))
          throw new Error(`"${field}" field has invalid type`);
    });
  });
}

function onlyKnownFields(obj: Generic, fields: Array<string>) {
  const objFields = Object.keys(obj);
  const unknownFields = objFields.filter((value) => !fields.includes(value));
  if (unknownFields.length > 0)
    throw Error(`unknown field(s) [\"${unknownFields.join('", "')}\"]`);
}

function hasRequiredFields(obj: Generic, fields: Array<string>) {
  const objFields = Object.keys(obj);
  const missingRequired = fields.filter((value) => !objFields.includes(value));
  if (missingRequired.length > 0)
    throw Error(
      `missing required field(s) ["${missingRequired.join('", "')}]"`
    );
}

export namespace Validators {
  export function date(obj: Generic) {
    try {
      onlyKnownFields(obj, ["y", "m", "d"]);
      hasRequiredFields(obj, ["y", "m"]);

      // Run validators for individual fields
      isValidType(obj, ["y", "m", "d"], [isNumber]);
    } catch (err) {
      throw new Error("Date Object:\n\t" + err.message);
    }
  }

  export function epoch(obj: Generic) {
    try {
      onlyKnownFields(obj, ["start", "end"]);
      hasRequiredFields(obj, ["start", "end"]);

      // Run validators for individual fields
      date(obj.start);
      date(obj.end);
    } catch (err) {
      throw new Error("Epoch Object:\n\t" + err.message);
    }
  }

  export function achievements(arr: Array<Generic>) {
    if (!Array.isArray(arr))
      throw new Error("Achievements Should be of type Array");

    arr.forEach((obj) => {
      // Run validators for individual fields
      try {
        onlyKnownFields(obj, ["name", "received", "location"]);
        hasRequiredFields(obj, ["name", "received"]);

        isValidType(obj, ["name", "location"], [isString]);
        date(obj.received);
      } catch (err) {
        throw new Error("Achievements Object:\n\t" + err.message);
      }
    });
  }

  export function workExperience(arr: Array<Generic>) {
    if (!Array.isArray(arr))
      throw new Error("Work Experience Object:\n\tShould be of type Array");

    arr.forEach((obj) => {
      // Run validators for individual fields
      try {
        onlyKnownFields(obj, ["company", "position", "epoch", "location"]);
        hasRequiredFields(obj, ["company", "position", "epoch"]);

        isValidType(obj, ["company", "posistion", "location"], [isString]);
        epoch(obj.epoch);
      } catch (err) {
        throw new Error("Work Experience Object:\n\t" + err.message);
      }
    });
  }

  export function education(arr: Array<Generic>) {
    if (!Array.isArray(arr))
      throw new Error("Education Should be of type Array");

    arr.forEach((obj) => {
      // Run validators for individual fields
      try {
        onlyKnownFields(obj, [
          "school",
          "type",
          "epoch",
          "complete",
          "course",
          "location",
        ]);
        hasRequiredFields(obj, ["school", "type", "epoch", "complete"]);

        isValidType(obj, ["school", "type", "course", "location"], [isString]);
        isValidType(obj, ["completed"], [isBoolean]);
        epoch(obj.epoch);
      } catch (err) {
        throw new Error("Education Object:\n\t" + err.message);
      }
    });
  }

  export function links(obj: Generic) {
    // Run validators for individual fields
    try {
      onlyKnownFields(obj, [
        "youtube",
        "github",
        "linkedin",
        "twitter",
        "website",
      ]);
      hasRequiredFields(obj, []);

      isValidType(
        obj,
        ["youtube", "github", "linkedin", "twitter", "website"],
        [isString]
      );
    } catch (err) {
      throw new Error("Links Object:\n\t" + err.message);
    }
  }

  export function contact(obj: Generic) {
    try {
      onlyKnownFields(obj, ["email", "mobile"]);
      hasRequiredFields(obj, ["email"]);
      //
      // Run validators for individual fields
      if (!(obj.email instanceof Array))
        throw new Error(`"email" field has invalid type`);
      obj.email.forEach((m: any) => isString(m));
      if (obj.mobile)
        if (!(obj.mobile instanceof Array))
          throw new Error(`"mobile" field has invalid type`);
      obj.mobile.forEach((m: any) => isString(m));
    } catch (err) {
      throw new Error("Contact Object:\n\t" + err.message);
    }
  }

  export function person(obj: Generic) {
    try {
      onlyKnownFields(obj, ["firstname", "surname", "middle", "preferred"]);
      hasRequiredFields(obj, ["firstname", "surname"]);

      // Run validators for individual fields
      isValidType(
        obj,
        ["firstname", "surname", "middle", "preferred"],
        [isString]
      );
    } catch (err) {
      throw new Error("Person Object:\n\t" + err.message);
    }
  }

  export function info(obj: Generic) {
    try {
      onlyKnownFields(obj, ["version"]);
      hasRequiredFields(obj, ["version"]);

      // Run validators for individual fields
      isValidType(obj, ["version"], [isString]);
    } catch (err) {
      throw new Error("Info Object:\n\t" + err.message);
    }
  }

  export function cvs(obj: Generic) {
    try {
      onlyKnownFields(obj, [
        "cvs",
        "info",
        "person",
        "contact",
        "links",
        "education",
        "workExperience",
        "achievements",
      ]);
      hasRequiredFields(obj, ["cvs", "info", "person", "contact"]);
      isString(obj.cvs);
    } catch (err) {
      throw new Error("CVS Object:\n\t" + err.message);
    }

    // Run validators for individual fields
    info(obj.info);
    person(obj.person);
    contact(obj.contact);

    if (obj.links) links(obj.links);
    if (obj.education) education(obj.education);
    if (obj.workExperience) workExperience(obj.workExperience);
    if (obj.achievements) achievements(obj.achievements);
  }
}

export function validate(obj: { [key: string]: any }) {
  Validators.cvs(obj);
}

export function validateRawJSON(raw: string) {
  if (raw == "") throw new TypeError("CVS Requires Content");
  validate(JSON.parse(raw));
}

export function validateRawYAML(raw: string) {
  if (raw == "") throw new TypeError("CVS Requires Content");
  validate(YAML.parse(raw));
}
