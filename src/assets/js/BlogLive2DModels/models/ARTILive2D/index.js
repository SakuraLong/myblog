import Live2DModel from '@/assets/js/Live2DModel'

import { createExpressions } from '../utils'
import { isInTimeInterval, probability, createQuickClickJudge } from '@/utils/utils'
import ThemeManager from '@/assets/js/ThemeManager'

import config from './config'
import message from './message'

export default class ATRILive2D extends Live2DModel {
  static message = message
  static name = config.name
  constructor() {
    super(config.name)

    this.tm = new ThemeManager()
    this.tm.on('change', this.themeChange, this)

    const res = createExpressions({
      expressionGroups: config.analyseJson.expressionGroups
    })

    this._expressionOptionMapList = res.expressionOptionMapList

    this._quickClickFace = createQuickClickJudge()
    this._quickClickFaceActive = false
    this._quickClickHead = createQuickClickJudge()
    this._quickClickHeadActive = false
    this._quickClickBody = createQuickClickJudge(400, 8)
    this._quickClickBodyActive = false

    this._live2DFrom = {
      url: config.url,
      'Version': 3,
      'FileReferences': {
        'Moc': 'atri_8.moc3',
        'Textures': [
          'https://cdn.jsdelivr.net/gh/SakuraLong/images/blog/blog-live2d-data/atri/texture/atri_8.4096/texture_00.png',
          'https://cdn.jsdelivr.net/gh/SakuraLong/images/blog/blog-live2d-data/atri/texture/atri_8.4096/texture_01.png'
        ],
        'Physics': 'atri_8.physics3.json',
        'DisplayInfo': 'atri_8.cdi3.json',
        'Expressions': res.expressions,
        'Motions': {}
      },
      'Groups': [
        {
          'Target': 'Parameter',
          'Name': 'EyeBlink',
          'Ids': [
            'ParamEyeLOpen',
            'ParamEyeROpen'
          ]
        },
        {
          'Target': 'Parameter',
          'Name': 'LipSync',
          'Ids': [
            'ParamMouthForm',
            'ParamMouthOpenY'
          ]
        }
      ],
      'HitAreas': [
        {
          'Id': 'HitArea',
          'Name': 'Body'
        },
        {
          'Id': 'HitArea2',
          'Name': 'Head'
        },
        {
          'Id': 'HitArea3',
          'Name': 'Face'
        }
      ]
    }
  }

  loaded() {
    this._model.x = -170
    this._model.y = 10
    this._model.scale.set(0.30)

    const night = isInTimeInterval([[0, 7], [19, 24]])
    const bikini = probability(1, 100)

    this.expression(
      [this.tm.themeMode === 0 ? '' : 'dark', bikini ? 'bikini' : night ? 'pajamas' : '', ''],
      {
        autoRecover: false
      }
    )

    super.loaded()
  }

  hitAreas(hitAreas) {
    const r = super.hitAreas(hitAreas)
    if (!r) return
    if (hitAreas[0] === 'Body') {
      if (this._quickClickBodyActive) return
      this.expression([null, null, 'no'])
      this._quickClickBody(() => {
        this._quickClickBodyActive = true
        this.expression(['dark', 'blood', 'highlightOut'], {
          update: false
        })
      })
    } else if (hitAreas.indexOf('Face') !== -1) {
      if (this._quickClickFaceActive) return
      this.expression([null, null, 'blush'])
      this._quickClickFace(() => {
        this._quickClickFaceActive = true
        this.expression([null, null, 'highlightOut'], {
          update: false
        })
      })
    } else {
      // Head
      if (this._quickClickHeadActive) return
      this.expression([null, null, 'yes'])
      this._quickClickHead(() => {
        this._quickClickHeadActive = true
        this.expression([null, null, 'wightEyes'], {
          update: false
        })
      })
    }
  }

  restoreExpression() {
    super.restoreExpression()
    this._quickClickFaceActive = false
    this._quickClickBodyActive = false
    this._quickClickHeadActive = false
  }

  idle() {
    super.idle()
    const birds = probability(1, 2)
    this.expression([null, null, birds ? 'birds' : 'kani'], {
      autoRecover: false,
      update: false
    })
  }

  expression(dataList, options) {
    const l = this._expressionOptionMapList.length
    const expressionOptions = this._expression.split('-').slice(1)
    for (let i = 0; i < l; i++) {
      const data = dataList[i]
      if (data === null) continue
      if (data === undefined) expressionOptions[i] = expressionOptions[i] ? '' : expressionOptions[i]
      if (data === 'default') expressionOptions[i] = ''
      else if (data === '') expressionOptions[i] = ''
      else if (i === 0 && data === 'light') expressionOptions[i] = ''
      else if (this._expressionOptionMapList[i].get(data)) expressionOptions[i] = data
    }
    const expression = 'expressions-' + expressionOptions.join('-')
    super.expression(expression, options)
  }

  themeTo(theme) {
    this.expression([theme === 'light' ? '' : 'dark'], { autoRecover: false })
  }

  costumeTo(costume) {
    if (costume === undefined) {
      const costumes = this.getCostumes()
      const _now = this._expression.split('-').slice(1)[1]
      const now = _now === '' ? 'default' : _now
      const _i = costumes.indexOf(now) + 1
      const i = _i >= costumes.length || _i < 0 ? 0 : _i
      costume = costumes[i]
    }
    this.expression([null, costume], { autoRecover: false })
  }

  getCostumes() {
    return ['default', 'pajamas']
  }

  themeChange() {
    this.expression(
      [this.tm.themeMode === 0 ? '' : 'dark'], { autoRecover: false }
    )
  }

  destroy() {
    super.destroy()
    this.tm.off('change', this.themeChange, this)
  }
}
