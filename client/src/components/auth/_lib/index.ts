import axios from 'axios'
export const createUser = async (data: any) => {
    console.log(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/create`)
    console.log(`Bearer ${import.meta.env.VITE_CLERK_SECRET}`)
    // console.log('Passed Data :', data)
    console.log(
        {
            email_address: [data.email_address],
            password: data.password,
            username: data.username,
            public_metadata: {
                favoriteEmoji: data.public_metadata.favoriteEmoji
            }
        }
    )
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/create`, {
        email_address: [data.email_address],
        password: data.password,
        username: data.username,
        public_metadata: {
            favoriteEmoji: data.public_metadata.favoriteEmoji
        }
    }, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CLERK_SECRET}`,
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
    }).catch(
        function (error) {
            console.log(error);
        }
    )
    return response
}