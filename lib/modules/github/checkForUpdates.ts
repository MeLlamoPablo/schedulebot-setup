import {Version, EVersionCompareResult} from "./Version";

export async function checkForUpdates(): Promise<Version|null> {

	let currentVersion = Version.getCurrent();

	if (currentVersion !== null) {

		let latestVersion = await
		Version.getLatest();

		switch (currentVersion.compareTo(latestVersion)) {

			case EVersionCompareResult.EQUAL:
				return null;

			case EVersionCompareResult.LESS:
				return latestVersion;

			default:
				throw new Error("This shouldn't happen!");

		}

	} else {

		// If the current version is not specified, it means that the database was just created,
		// and therefore it's running the latest version.
		return null;

	}

}