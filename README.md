# AI-Hompy 프로젝트

## 1. 프로젝트 개요
이 프로젝트는 AI를 사용하여 개인 홈페이지를 생성하는 것을 목표로 합니다. 개발 과정의 효율성을 높이기 위해 `spec-kit`을 사용하여 명세 기반 개발(Spec-Driven Development) 방법론을 적용합니다.

## 2. 프로젝트 설정 과정

이 프로젝트는 `Caret/Cline` 호환 AI 에이전트 시스템을 사용하기 위해 다음과 같은 과정을 통해 `.caretrules`를 설정했습니다.

### 단계 1: `spec-kit` 로컬 체크아웃
- AI 에이전트 개발 및 테스트를 위해 `aicoding-caret/spec-kit` 저장소를 로컬에 체크아웃했습니다.
- `spec-kit`의 `specify-cli`가 `.caretrules`를 올바르게 생성하도록 다음과 같은 수정 작업을 진행했습니다.
  1.  `__init__.py`의 의존성 목록에 `truststore` 추가
  2.  `.gitignore`에서 `*.zip` 규칙 제거
  3.  템플릿 패키지의 내부 구조를 `__rules__/workflows/`로 수정
  4.  수정된 모든 내용을 원격 저장소에 푸시

### 단계 2: `specify-cli` 설치
- `uv`를 사용하여 수정된 버전의 `specify-cli`를 전역 도구로 설치했습니다.
  ```bash
  uv tool install specify-cli --from git+https://github.com/aicoding-caret/spec-kit.git
  ```

### 단계 3: 프로젝트 초기화
- `ai-hompy` 프로젝트 루트에서 다음 명령어를 실행하여 `Caret` 호환 템플릿으로 프로젝트를 초기화했습니다.
  ```bash
  specify init . --ai cline
  ```
- 실행 중 나타나는 프롬프트에서 `Caret (.caretrules)` 옵션을 선택했습니다.

### 단계 4: 경로 수동 수정
- `specify-cli`의 경로 생성 오류로 인해 `workflows` 디렉토리가 최상위 경로에 생성되었습니다.
- 다음 명령어를 실행하여 파일들을 올바른 위치(`.caretrules/workflows/`)로 이동시키고 문제를 해결했습니다.
  ```bash
  mkdir -p .caretrules/workflows && mv workflows/*.md .caretrules/workflows/ && rm -rf workflows
  ```

## 3. 최종 상태
- 현재 이 프로젝트에는 `.caretrules/workflows/` 디렉토리와 그 안에 `plan.md`, `specify.md` 파일이 올바르게 설정되어 있습니다.
- 이제 Caret/Cline 호환 AI 에이전트를 사용하여 개발을 진행할 수 있습니다.
