export interface IProps {
	data?: ITableBody[];
	headers: ITableHeader[];
}

export interface ITableHeader {
	name: string;
	label: string;
	show?: boolean | ((row: ITableBody) => boolean);
}

export interface ITableBody {
	[key: string]: any;
}
