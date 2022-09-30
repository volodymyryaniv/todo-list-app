export const validateInput = (value: string) => {
  const validationPatern = new RegExp(/(&|\*|\$)/);
  return {
    isError: Boolean(value.match(validationPatern)),
    errorMessage: "Error! symbols '&', '*', '$' aren`t allowed.",
    validationPatern,
  };
};
