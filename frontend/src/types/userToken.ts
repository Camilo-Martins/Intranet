interface userToken{
    getToken: userInfo
}

interface userInfo{
    email: string
    id: string   
    name: string
    lastName: string
    rol: string
    __typename: any 
}

export default userToken