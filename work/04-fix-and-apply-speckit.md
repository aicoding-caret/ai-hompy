# `spec-kit` 의존성 오류 수정 및 `ai-hompy` 적용 최종 계획

## 1. 목표
`spec-kit` CLI의 의존성 오류를 수정하고, `ai-hompy` 프로젝트에 성공적으로 적용한 후, 그 과정을 `README.md`에 문서화한다.

## 2. 작업 단계

### 단계 1: `__init__.py` 스크립트 수정
- `spec-kit/src/specify_cli/__init__.py` 파일의 `dependencies` 목록에 `"truststore"`를 추가한다.
- `replace_in_file` 도구를 사용한다.

### 단계 2: `specify-cli` 실행 및 사용자 상호작용 안내
- 수정된 스크립트를 `uv run` 명령어로 실행한다.
- **실행 명령어**: `uv run spec-kit/src/specify_cli/__init__.py -- init . --ai cline`
- **중요**: 이 명령어는 상호작용이 필요하므로, 제가 직접 실행할 수 없습니다. 마스터께 명령어를 대신 실행하고, "Choose your agent type:" 프롬프트에서 `Caret (.caretrules)`를 선택하도록 요청한다.

### 단계 3: 결과 검증
- 마스터가 CLI 실행을 완료하면, `ls -a` 명령어를 사용하여 `.caretrules` 디렉토리의 생성을 확인한다.

### 단계 4: `ai-hompy/README.md` 생성
- `ai-hompy` 프로젝트 루트에 `README.md` 파일을 새로 생성한다.
- 파일 내용에는 이 프로젝트의 목적과 로컬 `spec-kit`을 사용하여 `.caretrules`를 설정하는 과정을 기록한다.

## 3. 실행 도구
- `write_to_file`
- `replace_in_file`
- `execute_command`
- `ask_followup_question`
