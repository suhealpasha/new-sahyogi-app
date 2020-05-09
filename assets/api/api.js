const URL = 'http://mathtech.co.in/microffee_api/API/'

//////////////////////// Common API's //////////////////////////


export const signInAPI = URL+'userLogin';
export const otpAPI = URL+'otp';
export const changePasswordAPI = URL+'changepassword';
export const resetPasswordAPI = URL+'resetPassword';
export const mobileCheckAPI = URL+'checkmobile';
export const regionsAPI = URL+'getregions';
export const varitiesAPI = URL+'getVariety';
export const originsByIdAPI = URL+'getOriginsById';
export const lotsAPI = URL+'getLots';
export const unitsAPI = URL+'getUnits';
export const productsAPI = URL+'getproducts';



//////////////////////// Buyer API's //////////////////////////

export const buyerSignupAPI = URL+'buyerSignUp';
export const buyerProfilePicUploadAPI = URL+'buyerProfilePicUpload';
export const buyerUpdateProfileAPI = URL+'buyerUpdateProfile';
export const buyerDetailsAPI = URL+'getBuyerdetails';
export const buyerAddAddressAPI = URL+'addBuyerAddress';
export const buyerAddressAPI = URL+'getBuyerAddress';
export const buyerAddressDeleteAPI = URL+'deleteBuyerAddress';
export const buyerAddressByIdAPI = URL+'getBuyerAddressById';
export const buyerAddressUpdateAPI = URL+'updateBuyerAddressById';
export const buyerHomeAPI = URL+'getBuyerHomeData';
export const buyerAllFeaturedProductAPI = URL+'getBuyerFeaturedProductData';
export const buyerAllProductAPI = URL+'getBuyerLatestProductData';
export const buyerProductByIdAPI = URL+'getBuyerProductsById';
export const buyerWishlistAPI = URL+'getBuyerWishlist';
export const buyerWishlistAddOrRemoveAPI = URL+'buyerProductWishList';

//////////////////////// Seller API's //////////////////////////

export const sellerDetailsAPI = URL+'getSellerdetails';
export const sellerAddAddressAPI =URL+'addSellerAddress';
export const sellerAddressAPI = URL+'getSellerAddress';
export const sellerAddressDeleteAPI = URL+'deleteSellerAddress';
export const sellerAddressByIdAPI = URL+'getSellerAddressById';
export const sellerAddressUpdateAPI = URL+'updateSellerAddressById';
