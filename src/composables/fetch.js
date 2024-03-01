import { ref, watchEffect, toValue } from 'vue'

export function useFetch(requestFunc, params, callback) {
  const loading = ref(true)
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null
    loading.value = true

    requestFunc(toValue(params))
      .then((res) => {
        data.value = res
        if (typeof callback === 'function') {
          callback(res)
        }
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        loading.value = false
      })
  }

  watchEffect(() => {
    fetchData()
  })

  return { loading, data, error }
}