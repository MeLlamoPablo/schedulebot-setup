import * as semver from "semver";
import * as request from "request-promise";
import {existingData} from "../../";

const API_URL = "https://api.github.com/repos/MeLlamoPablo/schedulebot/releases/latest";

export class Version {

	private _version: string;

	public get version(): string {
		return this._version.replace("v", "");
	}

	private setVersion(version: string): void {
		let versionToSet = version.replace("-dota", "");

		if (semver.valid(versionToSet) !== null) {
			this._version = versionToSet;
		} else {
			throw new Error(`Version ${version} is not a valid semver version.`);
		}
	}

	private constructor(version: string) {
		this.setVersion(version);
	}

	static async getLatest(): Promise<Version> {

		let response = await request({
			uri: API_URL,
			headers: {
				"User-Agent": "MeLlamoPablo/schedulebot"
			},
			method: "GET",
			json: true
		});

		return new Version(response.tag_name);

	}

	/**
	 * @return {Version|null}
	 *
	 * The current version or null if not specified. In that case, it's reasonable to assume
	 * it's the latest.
	 */
	static getCurrent(): Version|null {
		if (existingData.currentVersion) {

			return new Version(existingData.currentVersion);

		} else {

			return null;

		}
	}

	public compareTo(aVersion: Version): EVersionCompareResult {
		switch (semver.compare(this.version, aVersion.version)) {
			case 1: return EVersionCompareResult.GREATER;
			case 0: return EVersionCompareResult.EQUAL;
			case -1: return EVersionCompareResult.LESS;

			// Just so Typescript can shut the fuck up
			default: throw new Error("This shouldn't happen.");
		}
	}

}

export enum EVersionCompareResult {
	GREATER = 1,
	EQUAL = 0,
	LESS = -1
}