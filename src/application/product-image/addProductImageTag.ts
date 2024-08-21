import {useMutation,} from "@tanstack/react-query";

export const addProductImageTag = ({ productId, imageId, tag }) => {
    return fetch(`/api/products/${productId}/images/${imageId}/tags`, {
        method: 'PUT',
        body: JSON.stringify({ tag }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });
};

export const useAddProductImageTags = () => {
    return useMutation({
        mutationFn: addProductImageTag
    });
};
