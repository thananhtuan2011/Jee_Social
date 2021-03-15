import { BaseModel } from '../../_base/crud';
export class LeavePersonalCBCCModel extends BaseModel {
	ID_NV: number;
	ID_Row: number
	ID_HinhThuc: string;
	HinhThuc: string;
	SoNgay: string;
	GhiChu: string;
	NgayBatDau: string;
	NgayKetThuc: string;
	Buoi_NgayNghi: string;
	Buoi_NgayVaoLam: string;
	GioBatDau: string;
	GioKetThuc: string;
	IsNghiDiDuLich:boolean;
	DiaDiem:string;
	LyDo:string;

	clear() {
		this.ID_NV = 0;
		this.ID_Row = 0;
		this.ID_HinhThuc = '';
		this.HinhThuc = '';
		this.SoNgay = '';
		this.NgayBatDau = '';
		this.NgayKetThuc = '';
		this.GhiChu = '';
		this.Buoi_NgayNghi = 'AM';
		this.Buoi_NgayVaoLam = 'AM';
		this.GioBatDau = '';
		this.GioKetThuc = '';
		this.IsNghiDiDuLich = false;
		this.DiaDiem = '';
		this.LyDo  = '';
	}
}
export class LeavePersonalCBCCDetailsModel {
	ID_Row: number;
	ID: number;
	IsAccept: boolean;
	loai: string;
	HoTen: string;
	TenChucDanh: string;
	MaNV: string;
	BoPhan: string;
	BatDauTu: string;
	Den: string;
	HinhThuc: string;
	LyDo: string;
	Data_CapDuyet: any[] = [];
	Data_ApprovingUser: any[] = [];
	GhiChu: string;
	SoGio: string;
	LangCode: string;
	DataHtml:string;
	clear() {
		this.ID_Row = 0;
		this.ID = 0;
		this.IsAccept = false;
		this.loai = '';
		this.HoTen = '';
		this.TenChucDanh = '';
		this.MaNV = '';
		this.BoPhan = '';
		this.BatDauTu = '';
		this.Den = '';
		this.HinhThuc = '';
		this.LyDo = '';
		this.Data_CapDuyet = []
		this.Data_ApprovingUser = [];
		this.GhiChu = '';
		this.SoGio = '';
		this.LangCode = '';
		this.DataHtml = '';
	}
}

