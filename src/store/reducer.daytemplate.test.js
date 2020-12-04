import reducer from './reducer';

describe('test day template manipulation', () => {
  test('export day template', () => {
    expect(
      reducer({
        planning: [
          {},
          {},
          {},
        ]
      }, {
        type: "EXPORT_DAY_TEMPLATE",
          payload: {
            date: '2020-12-03',
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
})