const { app, BrowserWindow } = require("electron/main");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  /*
This event is triggered when the application is activated. This can happen in several situations, such as:

When the application is launched for the first time.
When the user clicks on the application's icon in the Dock (on macOS).
When the application becomes active again after being minimized or focused from another application.

The main purpose of this event is to handle the application's behavior when it is "activated" again, especially on macOS. On macOS, if the user has closed all windows but the application is still running (which is the standard behavior), when the application is reactivated (for example, by clicking on its icon in the Dock), the logical thing is for a new window to open. The activate event allows you to implement this logic. Without this code, when reactivating the application after closing all windows, the application would be running but without showing any window, which would be a bad user experience.

  */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/*
This event is triggered when all of the application's windows are closed. The function passed to it as an argument (() => { ... }) defines what happens at that moment.
*/
app.on("window-all-closed", () => {
  /*
        process.platform !== 'darwin': This condition checks if the operating system is not macOS (Darwin is the name of the macOS kernel).

        Why the distinction for macOS?

        On macOS, it's common for applications to remain open even if all their windows are closed (e.g., the Mail application). Users expect the application to continue running and be able to open new windows. Therefore, on macOS, closing all windows should not close the application itself.

    */

  if (process.platform !== "darwin") {
    /*
app.quit(): If the condition is true (i.e., it's not macOS), the application closes completely.
    */
    app.quit();
  }
});
