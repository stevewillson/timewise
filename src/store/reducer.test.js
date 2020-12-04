import reducer from './reducer';

describe('test category manipulation', () => {
  test('add category, no other categories', () => {
    expect(
      reducer({
        categories: []
      }, {
        type: "CREATE_CATEGORY",
          payload: {
            id: 'id_new_cat',
            title: 'title_new_cat',
            color: 'gray',
          }
      })
    ).toEqual({
      categories: [
        {
          id: 'id_new_cat',
          title: 'title_new_cat',
          color: 'gray',
        }
      ]
    })
  })

  test('delete category, no other categories', () => {
    expect(
      reducer({
        categories: [
          {
            id: 'id_new_cat',
            title: 'title_new_cat',
            color: 'gray',
          }
        ]
      }, {
        type: "DELETE_CATEGORY",
          payload: {
            id: 'id_new_cat',
          }
      })
    ).toEqual({
      categories: []
    })
  })

  test('update category, no other categories', () => {
    expect(
      reducer({
        categories: [
          {
            id: 'id_new_cat',
            title: 'title_new_cat',
            color: 'gray',
          }
        ]
      }, {
        type: "UPDATE_CATEGORY",
          payload: {
            id: 'id_new_cat',
            title: 'title_UPDATE_cat',
            color: 'blue',
          }
      })
    ).toEqual({
      categories: [
        {
          id: 'id_new_cat',
          title: 'title_UPDATE_cat',
          color: 'blue',
        }
      ]
    })
  })
})