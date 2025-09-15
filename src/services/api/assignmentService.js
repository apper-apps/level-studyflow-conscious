import { toast } from "react-toastify"

export const assignmentService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { name: "course_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "grade_c" } },
          { field: { Name: "category_c" } }
        ]
      }
      
      const response = await apperClient.fetchRecords("assignment_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching assignments:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return []
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { name: "course_id_c" }, referenceField: { field: { Name: "Name" } } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "grade_c" } },
          { field: { Name: "category_c" } }
        ]
      }
      
      const response = await apperClient.getRecordById("assignment_c", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching assignment with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return null
    }
  },

  async create(assignmentData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: assignmentData.Name || assignmentData.title_c,
          Tags: assignmentData.Tags || "",
          course_id_c: assignmentData.course_id_c?.Id || parseInt(assignmentData.course_id_c) || null,
          title_c: assignmentData.title_c || assignmentData.Name,
          description_c: assignmentData.description_c || "",
          due_date_c: assignmentData.due_date_c ? new Date(assignmentData.due_date_c).toISOString() : null,
          priority_c: assignmentData.priority_c || "medium",
          status_c: assignmentData.status_c || "pending",
          grade_c: assignmentData.grade_c ? parseInt(assignmentData.grade_c) : null,
          category_c: assignmentData.category_c || ""
        }]
      }
      
      const response = await apperClient.createRecord("assignment_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create assignment ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating assignment:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return null
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      }
      
      if (updates.Name !== undefined) updateData.Name = updates.Name
      if (updates.Tags !== undefined) updateData.Tags = updates.Tags
      if (updates.course_id_c !== undefined) updateData.course_id_c = updates.course_id_c?.Id || parseInt(updates.course_id_c) || null
      if (updates.title_c !== undefined) updateData.title_c = updates.title_c
      if (updates.description_c !== undefined) updateData.description_c = updates.description_c
      if (updates.due_date_c !== undefined) updateData.due_date_c = updates.due_date_c ? new Date(updates.due_date_c).toISOString() : null
      if (updates.priority_c !== undefined) updateData.priority_c = updates.priority_c
      if (updates.status_c !== undefined) updateData.status_c = updates.status_c
      if (updates.grade_c !== undefined) updateData.grade_c = updates.grade_c ? parseInt(updates.grade_c) : null
      if (updates.category_c !== undefined) updateData.category_c = updates.category_c
      
      const params = {
        records: [updateData]
      }
      
      const response = await apperClient.updateRecord("assignment_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update assignment ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating assignment:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return null
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord("assignment_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete assignment ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting assignment:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return false
    }
  }
}