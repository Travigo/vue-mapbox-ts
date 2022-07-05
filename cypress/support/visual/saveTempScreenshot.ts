export const saveTempScreenshot = (selector:string):string => {
  const filename = crypto.randomUUID();
  cy.get(selector).screenshot(filename, { overwrite: true });
  return filename;
};