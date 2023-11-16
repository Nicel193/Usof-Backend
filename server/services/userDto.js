class UserDto {
    getDto(rows) {
        let userArr = [];

        rows.forEach((element, i) => {
            userArr[i] = {
                id: element.id,
                login: element.login,
                fullName: element.fullName,
                profilePicture: element.profilePicture,
                rating: element.rating,
                roles: element.roles,
                email: element.email
            };
        });

        return userArr;
    }
}

export default new UserDto();