import { Settings } from "./_interfaces/types/settings"


export class DatabaseManager {
  private _settings: Settings

  public get settings(): Settings { return this._settings }
}