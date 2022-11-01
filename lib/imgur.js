if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
    throw new Error('Plaese add your NEXT_PUBLIC_CLIENT_ID to .env.local');
}

const onFileUpload = async (file) => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
    const formData = new FormData();
    formData.append("image", file);

    var options = {
        'method': 'POST',
        'headers': {
            'Authorization': `Client-ID ${clientId}`,
            'Accept': "application/json",
        },
        'body': formData
    };
    const res = await fetch(
        'https://api.imgur.com/3/image',
        options)
    const response = await res.json()
    if (res.ok) {
        return response
    }

}

export default onFileUpload;