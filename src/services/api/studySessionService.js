import { toast } from "react-toastify"

export const studySessionService = {
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
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "topic_c" } },
          { field: { Name: "completed_c" } }
        ]
      }
      
      const response = await apperClient.fetchRecords("study_session_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching study sessions:", error?.response?.data?.message)
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
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "topic_c" } },
          { field: { Name: "completed_c" } }
        ]
      }
      
      const response = await apperClient.getRecordById("study_session_c", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching study session with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return null
    }
  },

  async create(sessionData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: sessionData.Name || sessionData.topic_c,
          Tags: sessionData.Tags || "",
          course_id_c: sessionData.course_id_c?.Id || parseInt(sessionData.course_id_c) || null,
          date_c: sessionData.date_c ? new Date(sessionData.date_c).toISOString() : null,
          duration_c: parseInt(sessionData.duration_c) || 0,
          topic_c: sessionData.topic_c || "",
          completed_c: sessionData.completed_c || false
        }]
      }
      
      const response = await apperClient.createRecord("study_session_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create study session ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
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
        console.error("Error creating study session:", error?.response?.data?.message)
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
      if (updates.date_c !== undefined) updateData.date_c = updates.date_c ? new Date(updates.date_c).toISOString() : null
      if (updates.duration_c !== undefined) updateData.duration_c = parseInt(updates.duration_c) || 0
      if (updates.topic_c !== undefined) updateData.topic_c = updates.topic_c
      if (updates.completed_c !== undefined) updateData.completed_c = updates.completed_c
      
      const params = {
        records: [updateData]
      }
      
      const response = await apperClient.updateRecord("study_session_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update study session ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
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
        console.error("Error updating study session:", error?.response?.data?.message)
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
      
      const response = await apperClient.deleteRecord("study_session_c", params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete study session ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting study session:", error?.response?.data?.message)
      } else {
        console.error(error)
      }
      return false
    }
  }
}