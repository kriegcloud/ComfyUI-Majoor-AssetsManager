import json
from pathlib import Path

import pytest
from aiohttp import web
from aiohttp.test_utils import make_mocked_request

from mjr_am_backend.routes.handlers import thumbnails as m
from mjr_am_backend.shared import Result


def _app():
    app = web.Application()
    routes = web.RouteTableDef()
    m.register_thumbnail_routes(routes)
    app.add_routes(routes)
    return app


async def _get(app, filepath: str):
    req = make_mocked_request("GET", f"/mjr/am/thumbnail?filepath={filepath}", app=app)
    return await (await app.router.resolve(req)).handler(req)


@pytest.mark.asyncio
async def test_thumbnail_served_for_pinned_custom_root(monkeypatch, tmp_path: Path):
    source = tmp_path / "refs" / "a.png"
    source.parent.mkdir()
    source.write_bytes(b"png")
    thumb = tmp_path / "thumb.jpg"
    thumb.write_bytes(b"jpg")
    monkeypatch.setattr(m, "_is_path_allowed", lambda _p: False)
    monkeypatch.setattr(m, "_is_path_allowed_custom", lambda p: Path(p) == source.resolve())
    monkeypatch.setattr(m, "get_or_create_thumbnail", lambda _p, size: Result.Ok({"path": str(thumb)}))

    resp = await _get(_app(), str(source))

    assert isinstance(resp, web.FileResponse)


@pytest.mark.asyncio
async def test_thumbnail_still_forbidden_outside_allowed_roots(monkeypatch, tmp_path: Path):
    source = tmp_path / "elsewhere.png"
    source.write_bytes(b"png")
    monkeypatch.setattr(m, "_is_path_allowed", lambda _p: False)
    monkeypatch.setattr(m, "_is_path_allowed_custom", lambda _p: False)

    resp = await _get(_app(), str(source))

    assert json.loads(resp.text)["code"] == "FORBIDDEN"
