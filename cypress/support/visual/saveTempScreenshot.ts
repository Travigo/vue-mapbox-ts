let screenshotCount = 0;

export const saveTempScreenshot = (selector:string):string => {
  const filename = `screenshot-${screenshotCount++}`;
  cy.get(selector).screenshot(`${filename}`, { 
    overwrite: true,
  });
  
  return filename;
};