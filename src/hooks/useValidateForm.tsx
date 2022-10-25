export interface InputValidationI {
  required?: "text" | "number"
  email?: boolean
  minLengt?: number
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
  defaultValidation: Array<InputValidationI>
}

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

    keys.forEach((name: string, index: number) => {
      const validationRules: { [code: string]: any } = defaultValidation[index]
      const validationKeys = Object.keys(validationRules)

      validationKeys.forEach((rule: string) => {
        switch (rule) {
          case "required":
            if (!stateInputs[name] || stateInputs[name] === "") {
              validationInputs[name] = {
                error: true,
                message: "Este campo es requerido",
              }
            }
            break
          case "email":
            break
          case "minLengt":
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
