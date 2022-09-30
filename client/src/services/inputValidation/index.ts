export const validateInput = (value: string) => {
  return {
    isError: Boolean(value.match(/(&|\*|\$)/g)),
    errorMessage: "Error! symbols '&', '*', '$' aren`t allowed.",
  };
};
