export interface TSegment {
    segment_type: string,
    segment_value: string | TextParagraphSegment,
    segment_raw: string,
    segment_order: number
}

export interface BasicSegment {
    segment_type: string,
    segment_value: string,
    segment_raw: string,
    segment_order: number

}

export interface WordToken {
    word_string: string
    word_lemma: string
    word_pos: string
    is_multiple_words: boolean
    is_word: boolean
    is_eos: boolean
    next_is_ws: boolean
    word_status: number
    word_explanation: string
    word_pronunciation: string
}

export interface TokenSentence {
    segment_value: WordToken[]
    segment_type: string

}

export interface TextParagraphSegment {
    segment_value: TokenSentence[],
    segment_type: string,
    segment_raw: string
    segment_order: number

}

type ResponseText = {
    data: TSegment[]
}

