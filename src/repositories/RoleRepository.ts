import IRole from '../interfaces/RoleInterface.js'
import RoleModel from '../models/roleModel.js'

class RoleRepository {
    async createRole(roleData: IRole) {    
        try {
            const newRole = new RoleModel(roleData);
            return await newRole.save()
        } catch (error) {
            throw error
        }
      }
      async deleteRole(roleId: string) {    
        try {
            return await RoleModel.findByIdAndDelete(roleId);
        } catch (error) {
            throw error
        }
    }
}

export default new RoleRepository();