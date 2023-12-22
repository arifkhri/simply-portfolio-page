import { create } from 'zustand'

import fetchCSR from '@/utils/fetchCSR'

const { get, post, del, put } = fetchCSR();

export const profileStore = create()((setStore, getStore) => ({
  workExperiences: [],
  workExperienceDetail: null,
  profile: null,
  getWorkExperiences: () => {
    return get('/api/v1/experiences').then((res) => {
      setStore({ workExperiences: res });
    });
  },
  addWorkExperiences: (payload) => {
    return post('/api/v1/experiences', payload).then(() => {
      getStore().getWorkExperiences()
    });
  },
  deleteWorkExperience: (id) => {
    return del('/api/v1/experiences/' + id).then(() => {
      getStore().getWorkExperiences()
    });
  },
  updateWorkExperience: (id, payload) => {
    return put(`/api/v1/experiences/${id}`, payload).then(() => {
      getStore().getWorkExperiences()
    });
  },
  getProfile: () => {
    return get('/api/v1/profile/2').then((res) => {
      const profileData = res
      setStore({ profile: {
        ...profileData,
      } });
    });
  },
  updateProfile: (payload) => {
    return put(`/api/v1/profile/2`, payload).then(() => {
      getStore().getProfile();
    });
  },
  setWorkExperienceDetail: (data) => {
    setStore({ workExperienceDetail: data });
  }
}))
