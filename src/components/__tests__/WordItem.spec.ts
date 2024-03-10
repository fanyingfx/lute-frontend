import { describe, test, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WordItem from '../reading/WordItem.vue'
test('test jsdom', () => {
  expect(window).toBeDefined()
})
async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
describe('WordItem', () => {
  const wordId = '1'
  const wrapper = mount(WordItem, {
    attachTo: document.body,
    props: {
      word: {
        wordString: 'Help',
        wordLemma: 'help',
        wordPos: 'VERB',
        isMultipleWords: false,
        isWord: true,
        nextIsWs: false,
        wordStatus: 1,
        wordTokens: ['help'],
        wordPronunciation: '',
        wordExplanation: 'This is a help',
        wordImageSrc: '',
        wordDbId: -1
      },
      wordId: wordId
    }
  })
  it('should render text ', () => {
    expect(wrapper.text()).contains('Help')
  })
  it('should trigger', async () => {
    //https://github.com/tusen-ai/naive-ui/blob/main/src/popover/tests/Popover.spec.tsx
    await wrapper.find('.word_text').trigger('mouseenter')
    expect(document.querySelector(`#popcard_${wordId}`)).toEqual(null)
    await sleep(150)
    const card = document.querySelector(`#popcard_${wordId}`)

    expect(card?.textContent).toContain('This is a help')

    await wrapper.find('.word_text').trigger('mouseleave')
    await sleep(150)
    expect(document.querySelector(`#popcard_${wordId}`)).toEqual(null)
  })
})
