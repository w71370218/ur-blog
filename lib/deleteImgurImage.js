if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
    throw new Error('Plaese add your NEXT_PUBLIC_CLIENT_ID to .env.local');
}

const deleteImgurImage = async (deleteHash) => {
    const clientId = process.env.CLIENT_ID
    var options = {
        'method': 'DELETE',
        'headers': {
            'Authorization': `Client-ID ${clientId}`,
        },
        formData: {}
    };
    const res = await fetch(
        `https://api.imgur.com/3/image/${deleteHash}`,
        options)
    if (res.ok) {
        console.log("Delete 1 Image!")
    }
}


export default deleteImgurImage;