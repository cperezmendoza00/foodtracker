interface validateField {
  value: string,
  type: 'numeric' | 'text',
  required: boolean,
  errorSetter: { (value: React.SetStateAction<boolean>): void },
  fieldSetter: { (value: React.SetStateAction<string>): void }
}

export const validateFields = (fields: validateField[]) => {
  let error: boolean = false
  fields.map(field => {
    const valueTrimmed: string = field.value.trim()
    if (valueTrimmed !== field.value) {
      field.fieldSetter(valueTrimmed)
    }
    if (valueTrimmed === '') {
      if (field.required) {
        field.errorSetter(true)
        error = true
      }
    } else {
      if (field.type === 'numeric' && !Number(valueTrimmed)) {
        field.errorSetter(true)
        error = true
      } else {
        field.errorSetter(false)
      }
    }
  })

  return error


}