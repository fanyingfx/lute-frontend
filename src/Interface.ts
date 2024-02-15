export interface TSegment {
    segment_type: string,
    segment_value: string |SentenceSegment,
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

export interface SentenceSegment {
    segment_value: WordToken[]
    segment_type: string
    segment_raw: string
    paragraph_order: number
    sentence_order: number

}

export interface TextParagraphSegment {
    segment_value: SentenceSegment[],
    segment_type: string,
    segment_raw: string
    segment_order: number

}

export interface ServerResponse {
    data: TSegment[]
}


