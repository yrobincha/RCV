const errors = {
  get uploadMissingFile400() {
    return {
      code: 400,
      err: "파일이 없습니다.",
      msg: "요청 본문은 업로드 할 파일을 포함해야합니다.",
    };
  },
  get parameterTrackMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다.",
      msg: '필수 입력값 "track"이 누락되었습니다',
    };
  },
  get parameterTrackTypeMissing400() {
    return {
      code: 400,
      err: "입력값이 잘못되었습니다",
      msg:
        '입력 타입이 잘못되었거나 "video" 혹은 "audio" 형식의 파일이 아닙니다.',
    };
  },
  get parameterItemMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다",
      msg: "track 또는 item 입력이 없습니다.",
    };
  },
  get parameterDurationMissing400() {
    return {
      code: 400,
      err: "기간이 누락되었습니다.",
      msg:
        "타임라인에 이미지를 삽입하려면 00 : 00 : 00,000 형식으로 기간을 입력해야합니다.",
    };
  },
  get parameterSplitMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다.",
      msg: "필수 입력 track, item, time이 누락되었습니다.",
    };
  },
  get parameterFilterMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다.",
      msg: '필수 입력 "track", "item", "filter"가 누락되었습니다.',
    };
  },
  get parameterMoveMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다.",
      msg: "필수 입력 track, trackTarget, item, time이 누락되었습니다.",
    };
  },
  parameterTimeRange400: (time) => {
    return {
      code: 400,
      err: "입력값이 범위를 벗어났습니다.",
      msg: `시간 입력값은 00:00:00,000와 ${time} 사이여야 합니다.`,
    };
  },
  get parameterTimeWrong400() {
    return {
      code: 400,
      err: "잘못된 입력값입니다.",
      msg: "시간 입력값은 00 : 00 : 00,000 형식이어야합니다.",
    };
  },
  get parameterTransitionMissing400() {
    return {
      code: 400,
      err: "입력값이 누락되었습니다.",
      msg:
        "필수 입력값 track, itemA, itemB, transition, duration이 누락되었습니다.",
    };
  },
  get parameterTransitionWrong400() {
    return {
      code: 400,
      err: "입력값이 잘못되었습니다.",
      msg:
        "입력값 itemA, itemB는 정수여야하며, duration 00:00:00,000 형식으로 0이 아니어야 합니다.",
    };
  },
  get parameterTransitionOrder400() {
    return {
      code: 400,
      err: "입력값이 잘못되었습니다.",
      msg: "itemA는 itemB 바로 뒤에 와야 합니다.",
    };
  },
  get transitionTooLong400() {
    return {
      code: 400,
      err: "전환 시간이 너무 깁니다.",
      msg: "전환이 이미지 중 하나의 시간보다 깁니다.",
    };
  },
  get imgWrongTrack400() {
    return {
      code: 400,
      err: "지원되지 않는 파일 형식입니다.",
      msg: "이미지는 비디오 트랙에만 삽입할 수 있습니다.",
    };
  },
  get videoWrongTrack400() {
    return {
      code: 400,
      err: "지원되지 않는 파일 형식입니다.",
      msg: "비디오는 비디오 트랙에만 포함할 수 있습니다.",
    };
  },
  get audioWrongTrack400() {
    return {
      code: 400,
      err: "지원되지 않는 파일 형식입니다.",
      msg: "오디오는 오디오 트랙에만 포함할 수 있습니다.",
    };
  },
  get videoDurationMissing400() {
    return {
      code: 400,
      err: "파일 길이가 누락되었습니다.",
      msg:
        "동영상 길이가 감지되지 않았습니다. 다시 시도하거나 파일을 다시 업로드하십시오.",
    };
  },
  get audioDurationMissing400() {
    return {
      code: 400,
      err: "파일 길이가 누락되었습니다.",
      msg:
        "오디오 길이가 감지되지 않았습니다. 다시 시도하거나 파일을 다시 업로드하십시오.",
    };
  },
  get tracksIncompatible400() {
    return {
      code: 400,
      err: "호환되지 않는 트랙입니다.",
      msg: "비디오와 오디오 트랙 간에는 항목을 이동할 수 없습니다.",
    };
  },
  get trackDefaultDel403() {
    return {
      code: 403,
      err: "트랙을 삭제할 수 없습니다.",
      msg: '기본 트랙 "videotrack0"및 "audiotrack0"은 삭제할 수 없습니다.',
    };
  },
  get fileWrongTrack403() {
    return {
      code: 403,
      err: "지원되지 않는 파일 형식입니다.",
      msg: "타임 라인에는 비디오, 이미지 또는 오디오만 붙여 넣을 수 있습니다.",
    };
  },
  get sourceInUse403() {
    return {
      code: 403,
      err: "리소스가 사용 중입니다.",
      msg:
        "리소스는 프로젝트에서 사용됩니다. 프로젝트에서 삭제하기 전에 타임라인에서 제거하십시오.",
    };
  },
  get transitionExists403() {
    return {
      code: 403,
      err: "이미 적용된 전환입니다.",
      msg: "선택한 요소에 이미 상호 전환이 있습니다.",
    };
  },
  filterExists403: (item, track, filter) => {
    return {
      code: 403,
      err: "필터가 이미 적용되었습니다.",
      msg: `${track}"트랙의 "${item}"항목에 이미 "${filter}"필터가 적용되었습니다.`,
    };
  },
  get projectStillRendering403() {
    return {
      code: 403,
      err: "처리중.",
      msg: "프로젝트가 이미 처리 중입니다. 완료 될 때까지 기다리십시오.",
    };
  },
  get moveNoSpace403() {
    return {
      code: 403,
      err: "항목을 옮길 공간이 없습니다.",
      msg:
        "옮기고자 하는 위치는 비어 있지 않습니다. 항목을 이동할 수 없습니다.",
    };
  },
  get projectNotFound404() {
    return {
      code: 404,
      err: "프로젝트가 존재하지 않습니다.",
      msg: "지정한 프로젝트가 없습니다.",
    };
  },
  get sourceNotFound404() {
    return {
      code: 404,
      err: "리소스를 찾을 수 없습니다.",
      msg: "리소스가 프로젝트에 없습니다.",
    };
  },
  trackNotFound404: (track) => {
    return {
      code: 404,
      err: "트랙을 찾을 수 없습니다.",
      msg: `지정된 트랙 "${track}"이 프로젝트에 없습니다.`,
    };
  },
  itemNotFound404: (item, track) => {
    return {
      code: 404,
      err: "항목을 찾을 수 없습니다.",
      msg: `"${item}"항목이 "${track}"트랙에 없습니다.`,
    };
  },
  filterNotFound404: (item, track, filter) => {
    return {
      code: 404,
      err: "필터를 찾을 수 없습니다.",
      msg: `"${filter}"필터는 ${item}에 있습니다. 트랙 항목 "${track}"을 (를) 찾을 수 없습니다.`,
    };
  },
  get projectFailedOpen500() {
    return {
      err: "프로젝트를 열 수 없습니다.",
      msg: "프로젝트를 로드하는 동안 오류가 발생했습니다.",
    };
  },
};

module.exports = errors;
