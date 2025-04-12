  export const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return ("Invalid email format");
    } else {
      return("");
    }
  };

  export const validateFullName = (name: string) => {
    const isValid = /^[a-zA-Z\s]{3,}$/.test(name);
    return isValid ? "" : "invalid fullname";
  };

  export const validateUserName = (username: string) => {
    const isValid = /^[a-zA-Z0-9_]{3,15}$/.test(username);
    return isValid ? "" : "invalid username";
  };


  export  const validateCity = (city: string) => {
      if (!/^[A-Za-z\s]+$/.test(city) || city.length < 2) {
        return ("Enter valid city name");
      } else {
        return ("");
      }
    };
  
  export  const validatePostCode = (postCode: string) => {
      if (!/^\d{6}$/.test(postCode)) {
        return ("Enter 6-digit postal code");
      } else {
        return ("");
      }
    };