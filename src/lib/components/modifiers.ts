export type CPT = {
	label: string;
	checked: boolean;
	modifier: string;
	pointers: string[];
	cost: number;
	unit: number;
};

export type DateObject = {
	date: string;
	labels: string[];
};

export const cpts: CPT[] = [
	{
		label: '99203',
		checked: false,
		modifier: '25',
		pointers: ['A', 'B'],
		cost: 95,
		unit: 1
	},
	{
		label: '99213',
		checked: false,
		modifier: '25',
		pointers: ['A', 'B'],
		cost: 90,
		unit: 1
	},
	{
		label: '99214',
		checked: false,
		modifier: '25',
		pointers: ['A', 'B'],
		cost: 95,
		unit: 1
	},
	{
		label: '97813',
		checked: false,
		modifier: '',
		pointers: ['A', 'B'],
		cost: 75,
		unit: 1
	},
	{
		label: '97814',
		checked: false,
		modifier: '',
		pointers: ['A', 'B'],
		cost: 120,
		unit: 2
	},
	{
		label: '97810',
		checked: false,
		modifier: '',
		pointers: ['A', 'B'],
		cost: 65,
		unit: 1
	},
	{
		label: '97811',
		checked: false,
		modifier: '',
		pointers: ['A', 'B'],
		cost: 110,
		unit: 2
	},
	{
		label: 'S8930',
		checked: false,
		modifier: '',
		pointers: ['A', 'B'],
		cost: 75,
		unit: 2
	},
	{
		label: '97026',
		checked: false,
		modifier: '59',
		pointers: ['A', 'B'],
		cost: 10,
		unit: 1
	},
	{
		label: '97016',
		checked: false,
		modifier: '59',
		pointers: ['A'],
		cost: 10,
		unit: 1
	},
	{
		label: '97140',
		checked: false,
		modifier: 'GP',
		pointers: ['A', 'B'],
		cost: 60,
		unit: 2
	},
	{
		label: '99212',
		checked: false,
		modifier: '25',
		pointers: ['A', 'B'],
		cost: 60,
		unit: 1
	}
];
