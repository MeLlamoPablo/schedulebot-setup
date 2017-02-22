import * as _ from "lodash";

export default class PugDataGenerator {

	private static _instance: PugDataGenerator = new PugDataGenerator();

	private defaultData: any = {};

	private constructor() {
		if (PugDataGenerator._instance) {
			throw new Error("Already instantiated.")
		}

		this.initializeDefaults();
		PugDataGenerator._instance = this;
	}

	private initializeDefaults(): void {
		this.defaultData = {
			nav: {
				title: "ScheduleBot Setup"
			},
			menu: [
				{
					name: "Introduction"
				},
				{
					name: "Bot account",
					preventNext: true
				},
				{
					name: "Bot admin",
					preventNext: true
				},
				{
					name: "Bot settings",
					preventNext: true
				},
				{
					name: "Steam accounts",
					preventNext: true
				},
				{
					name: "Finish"
				}
			]
		};

		// Create kebab case ids for menu elements.
		for (let item of this.defaultData.menu) {
			item.id = _.kebabCase(item.name);
		}
	}

	private static getInstance(): PugDataGenerator {
		return PugDataGenerator._instance;
	}

	private getDefaultData(): any {
		return Object.create(this.defaultData);
	}

	/**
	 * Merges an input object with the default data to be passed to pug.
	 *
	 * @param {object} input
	 * @return {object}
	 */
	public static get(input) {
		let generator = PugDataGenerator.getInstance();

		return Object.assign(generator.getDefaultData(), input);
	}

}