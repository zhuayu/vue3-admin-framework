const loading = ref(true)
const dataSource = ref({})
const id = ref(route.params.id)
const page = ref(1)
const name = ref('')

onMounted(() => {
  getData()
})

onWatch(id, () => {
  getData()
})

function getDate() {
  const params = {
    course_id: id.value,
    name: name.value,
    page: page.value,
  }
  xxxService.courses(params)
    .then(res => {
      dataSource.value = res.list;
    })
    .finally( res => {
      loading = false;
    })
}

function handleNameChanged(name) {
  name.value = name;
  getData()
}

function handlePageChanged(page) {
  page.value = page;
  getData()
}