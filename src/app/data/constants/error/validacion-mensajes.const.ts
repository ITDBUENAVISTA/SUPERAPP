import { ValidationMessagesModel } from "src/app/core/interfaces/messages/validacion-mensajes.interface";

export const VALIDATE_MESSAGES_USER: ValidationMessagesModel = {
  username: [
    { type: 'required', message: 'El username es requerido.' },
    { type: 'minlength', message: 'El username no puede tener menos de 5 caracteres.' },
    { type: 'maxlength', message: 'El username no puede tener más de 15 caracteres.' },
    { type: 'pattern', message: 'El username solo permite letras y números.' },

  ],
  password: [
    { type: 'required', message: 'La contraseña es requerida.' },
    { type: 'minLength', message: 'La contraseña debe tener al menos 8 caracteres.' },
    { type: 'pattern', message: 'La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial.' },
  ],
  rols: [
    { type: 'required', message: 'Debe seleccionar un rol.' },
  ],
  person: [
    { type: 'required', message: 'Debe seleccionar una persona.' },
  ],
  confirmPassword: [
    { type: 'required', message: 'Debe confirmar la contraseña.' },
  ],
};

export const VALIDATE_MESSAGES_VOUNCHER: ValidationMessagesModel = {
  date: [
    { type: 'required', message: 'La fecha es requerida.' },
  ],
  concept: [
    { type: 'required', message: 'El concepto es requerido.' },
  ],
  file: [
    { type: 'required', message: 'El comprobante es requerido.' },
  ]
};

export const VALIDATE_MESSAGES_RESERVE: ValidationMessagesModel = {
  date: [
    { type: 'required', message: 'La fecha es obligatoria.' },
  ],
  schedule: [
    { type: 'required', message: 'Debe seleccionar una jornada.' },
  ],
  people: [
    { type: 'required', message: 'El número de personas es obligatorio.' },
    { type: 'min', message: 'El número de personas debe ser mayor a 0.' },
  ],
  customer: [
    { type: 'required', message: 'Debe seleccionar un lote.' },
  ]
};
