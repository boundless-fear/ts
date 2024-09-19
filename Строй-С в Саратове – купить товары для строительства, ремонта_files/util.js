const getOldPrice = (price, discountPrice) => {
    return price + discountPrice;
};

const formatPrice = (price) => {
    return Math.round(price * 100) / 100;
};

const getDiscount = (price, discountPrice) => {
    return Math.round(discountPrice/price * 100)
};


