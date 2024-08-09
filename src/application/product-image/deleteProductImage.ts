import {useMutation,} from "@tanstack/react-query";

export const deleteProductImage = ({ productId, imageId }) => {
    return fetch(`/api/products/${productId}/images/${imageId}`, {
        method: 'DELETE',
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });
};

export const useDeleteProductImages = () => {
    return useMutation({
        mutationFn: deleteProductImage
    });
};
