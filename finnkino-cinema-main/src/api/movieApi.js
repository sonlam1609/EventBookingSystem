import axiosClient from "./config/axiosClient";

const resourceName = "event/";

const movieApi = {
  getBannerList: () => {
    const url = resourceName + "LayDanhSachBanner";
    return axiosClient.get(url);
  },
  getMovieList: (params, movieName) => {
    let url;
    url = resourceName + "event-list";
    return axiosClient.get(url);
    // if (movieName !== "") {
    //   url = resourceName + `LayDanhSachPhim?maNhom=${params.maNhom}&tenPhim=${movieName}`;
    //   return axiosClient.get(url);
    // } else {
    //   url = resourceName + "LayDanhSachPhim";
    //   return axiosClient.get(url, { params });
    // }
  },
  getPaginatedMovieList: (params) => {
    const url = resourceName + "LayDanhSachPhimPhanTrang";
    return axiosClient.get(url, { params });
  },
  getMovieListByDate: (params) => {
    const url = resourceName + "LayDanhSachPhimTheoNgay";
    return axiosClient.get(url, { params });
  },
  getMovieDetails: (params) => {
    const url = resourceName + `event-detail/${params}`;
    return axiosClient.get(url);
  },
  deleteMovie: (params) => {
    const url = resourceName + `XoaPhim?MaPhim=${params}`;
    return axiosClient.delete(url);
  },
  addMovie: (formData) => {
    const url = resourceName + "ThemPhimUploadHinh";
    return axiosClient.post(url, formData);
  },
  editMovie: (formData) => {
    const url = resourceName + "CapNhatPhimUpload";
    return axiosClient.post(url, formData);
  },
};

export default movieApi;
