class Type 
{
    static t: 'Admin' | 'User'
}
type UserRole = typeof Type.t;
export default UserRole;