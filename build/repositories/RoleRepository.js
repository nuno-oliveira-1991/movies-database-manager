import RoleModel from '../models/roleModel.js';
class RoleRepository {
    async createRole(roleData) {
        try {
            const newRole = new RoleModel(roleData);
            return await newRole.save();
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRole(roleId) {
        try {
            return await RoleModel.findByIdAndDelete(roleId);
        }
        catch (error) {
            throw error;
        }
    }
}
export default new RoleRepository();
//# sourceMappingURL=RoleRepository.js.map