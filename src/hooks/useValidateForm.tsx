export interface ItemInputValidationI {
  required?: "text" | "number" | "boolean" | "email"
  minLengt?: number
}

export interface InputValidationI {
  [index: string]: ItemInputValidationI
}

interface IErrorInput {
  error: boolean
  message: string
}

export interface IErrorInputs {
  [code: string]: IErrorInput
}

interface IUseValidateForm {
  defaultInputs: Object
  defaultValidation: InputValidationI
}

const emailRegex =
  /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i

const useValidateForm = (
  props: IUseValidateForm
): {
  validationInputs: IErrorInputs
  getValidation: (stateInputs: Object) => {
    errors: IErrorInputs
    validation: boolean
  }
} => {
  let validationInputs: IErrorInputs = {}
  const { defaultInputs, defaultValidation } = props
  const keys = Object.keys(defaultInputs)

  keys.forEach((name: string) => {
    validationInputs[name] = {
      error: false,
      message: "",
    }
  })

  const getValidation = (stateInputs: { [code: string]: any }) => {
    const keys = Object.keys(stateInputs)
    let validation = true

    keys.forEach((name: string) => {
      const validationRules: { [code: string]: any } = defaultValidation[name]
      const validationKeys = Object.keys(validationRules)

      validationKeys.forEach((rule: string) => {
        switch (rule) {
          case "minLengt":
            stateInputs[name].length < validationRules[rule] &&
              (validationInputs[name] = {
                error: true,
                message: `Ingresa ${validationRules[rule]} o más caracteres de longitud`,
              })
            break
          case "required":
            // Requerido general
            ;(!stateInputs[name] || stateInputs[name] === "") &&
              (validationInputs[name] = {
                error: true,
                message: "Este campo es requeridooo",
              })

            // Requerido booleano
            validationRules[rule] === "boolean" &&
              !stateInputs[name] &&
              (validationInputs[name] = {
                error: true,
                message: "Este campo es requerido",
              })

            // Requerido numero
            validationRules[rule] === "number" &&
              isNaN(stateInputs[name]) &&
              (validationInputs[name] = {
                error: true,
                message: "Ingresa un numero válido",
              })

            // Requeriso email
            validationRules[rule] === "email" &&
              !emailRegex.test(stateInputs[name]) &&
              (validationInputs[name] = {
                error: true,
                message: "Ingresa un email válido",
              })
            break
        }
      })
    })

    keys.forEach((name: string) => {
      validationInputs[name].error && (validation = false)
    })

    return {
      errors: validationInputs,
      validation,
    }
  }

  return {
    validationInputs,
    getValidation,
  }
}

export default useValidateForm
