const fileReaderHelper = async (file: File): Promise<ArrayBuffer> => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);

    // wrap the filereader callback in a promise
    return new Promise<ArrayBuffer>(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
    });
};

export const arrayBufferToBase64 = (data: string) => {
    return new Promise((resolve, reject) => {
        const blob = new Blob([data], { type: "image/png" });

        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export default fileReaderHelper;
