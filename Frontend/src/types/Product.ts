

/**
 * 상품 타입
 * @image 상품 이미지
 * @name 상품 이름
 * @description 상품 설명
 * @price 상품 가격
 * @shippingPrice 배송비
 * @shippingDay 배송일
 * @inventory 재고
 */
interface Product {
    image: File | null;
    name: string;
    description: string;
    price: number;
    shippingPrice: number;
    shippingDay: string;
    inventory: number;
}

export default Product;