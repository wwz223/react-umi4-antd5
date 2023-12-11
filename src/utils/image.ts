export const getImageMsg = (src: string): Promise<{ width: number, height: number }> => {
    const img = new Image();
    img.src = src;
    return new Promise((resolve) => {
        img.onload = () => {
            resolve(img)
        };
    })

}