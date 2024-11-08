import secureLocalStorage from "react-secure-storage";
export const addUserToLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', JSON.stringify(token));
};

export const addSubmissionToLocalStorage = (submission) => {
  localStorage.setItem('submission', JSON.stringify(submission));
};

export const addIsTutorToLocalStorage = (isTutor) => {
  secureLocalStorage.setItem('is_tutor', isTutor);
};

// export const addStatusTimeSectionToLocalStorage = (status) => {
//   localStorage.setItem('status_time_section', status);
// };


export const updateUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};


export const removeUserFromLocalStorage = () => {
  // localStorage.removeItem('user');
  // localStorage.removeItem('token');
  // localStorage.removeItem('link-url');
  // localStorage.removeItem('submission');
  secureLocalStorage.removeItem('is_tutor');
  localStorage.clear();
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result && result!='undefined' ? JSON.parse(result) : null;
  return user;
};

export const getIsTutorFromLocalStorage = () => {
  const result = secureLocalStorage.getItem('is_tutor');
  return result;
};

// export const getTimeSectionFromLocalStorage = () => {
//   const result = localStorage.getItem('time_section');
//   return result;
// };

// export const getStatusTimeSectionFromLocalStorage = () => {
//   const result = localStorage.getItem('status_time_section');
//   return result;
// };



export const getSubmissionFromLocalStorage = () => {
  const result = localStorage.getItem('submission');
  const user = result ? JSON.parse(result) : null;
  return user;
};


export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem('token');
  const user = result && result!='undefined' ? JSON.parse(result) : null;
  return user;
};



export const addrankVersionToLocalStorage = (data, type='') => {
  if (type!==null && type !== ''){
    localStorage.setItem('rankVersion'+type, JSON.stringify(data));
  }else{
    localStorage.setItem('rankVersion', JSON.stringify(data));
  }
};

export const getRankVersionFromLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    const result = localStorage.getItem('rankVersion'+type);
    const data = result ? JSON.parse(result) : null;
    return data;
  }else{
    const result = localStorage.getItem('rankVersion');
  const data = result ? JSON.parse(result) : null;
  return data;
  }

};

export const removerankVersionToLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    localStorage.removeItem('rankVersion'+type);
  }else{
    localStorage.removeItem('rankVersion');
  }
};




export const addrankBundleToLocalStorage = (data, type='') => {
  if (type!==null && type !== ''){
    localStorage.setItem('rankBundle'+type, JSON.stringify(data));
  }else{
    localStorage.setItem('rankBundle', JSON.stringify(data));
  }
};

export const getRankBundleFromLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    const result = localStorage.getItem('rankBundle'+type);
    const data = result ? JSON.parse(result) : null;
    return data;
  }else{
    const result = localStorage.getItem('rankBundle');
  const data = result ? JSON.parse(result) : null;
  return data;
  }

};

export const removerankBundleToLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    localStorage.removeItem('rankBundle'+type);
  }else{
    localStorage.removeItem('rankBundle');
  }
};



export const addrankInstitutionToLocalStorage = (data, type='') => {
  if (type!==null && type !== ''){
    localStorage.setItem('rankInstitution'+type, JSON.stringify(data));
  }else{
    localStorage.setItem('rankInstitution', JSON.stringify(data));
  }
};

export const getRankInstitutionFromLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    const result = localStorage.getItem('rankInstitution'+type);
    const data = result ? JSON.parse(result) : null;
    return data;
  }else{
    const result = localStorage.getItem('rankInstitution');
  const data = result ? JSON.parse(result) : null;
  return data;
  }

};

export const removerankInstitutionToLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    localStorage.removeItem('rankInstitution'+type);
  }else{
    localStorage.removeItem('rankInstitution');
  }
};




export const addrankPackageToLocalStorage = (data, type='') => {
  if (type!==null && type !== ''){
    localStorage.setItem('rankPackage'+type, JSON.stringify(data));
  }else{
    localStorage.setItem('rankPackage', JSON.stringify(data));
  }

};

export const getRankPackageFromLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    const result = localStorage.getItem('rankPackage'+type);
    const data = result ? JSON.parse(result) : null;
    return data;
  }else{
    const result = localStorage.getItem('rankPackage');
  const data = result ? JSON.parse(result) : null;
  return data;
  }

};

export const removerankPackageToLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    localStorage.removeItem('rankPackage'+type);
  }else{
    localStorage.removeItem('rankPackage');
  }
};




export const addChartToLocalStorage = (data, type='') => {
  if (type!==null && type !== ''){
    localStorage.setItem('chart'+type, JSON.stringify(data));
  }else{
    localStorage.setItem('chart', JSON.stringify(data));
  }
};

export const getChartFromLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    const result = localStorage.getItem('chart'+type);
    const data = result ? JSON.parse(result) : null;
    return data;
  }else{
    const result = localStorage.getItem('chart');
  const data = result ? JSON.parse(result) : null;
  return data;
  }

};

export const removeChartToLocalStorage = (type='') => {
  if (type!==null && type !== ''){
    localStorage.removeItem('chart'+type);
  }else{
    localStorage.removeItem('chart');
  }
};


