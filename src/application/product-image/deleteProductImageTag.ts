import {useMutation,} from "@tanstack/react-query";

export const deleteProductImageTag = ({ productId, imageId, tag }) => {
    return fetch(`/api/products/${productId}/images/${imageId}/tags?tag=${tag}`, {
        method: 'DELETE',
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });
};

export const useDeleteProductImageTags = () => {
    return useMutation({
        mutationFn: deleteProductImageTag
    });
};
