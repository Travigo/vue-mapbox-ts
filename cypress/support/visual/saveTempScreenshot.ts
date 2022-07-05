export const saveTempScreenshot = (selector:string):string => {
  const filename = crypto.randomUUID();
  cy.get(selector).screenshot(`test/${filename}`, { 
    overwrite: true,
  });
  
  return filename;
};